import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { LLState } from "../types";
import Markdown from "../Markdown/Markdown";

type MainWindowProps = {
  width: number;
  height: number;
  llState: LLState;
  setLLState: (state: LLState) => void;
};

export const MainWindow: FunctionComponent<MainWindowProps> = ({
  width,
  height,
  llState,
  setLLState,
}) => {
  const [mainMd, setMainMd] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("/level-up-linux/main.md");
      const text = await response.text();
      setMainMd(text);
    })();
  }, []);

  const handleSubmitToken = useCallback(
    async (challengeId: string) => {
      const token = prompt(`Enter token for challenge ${challengeId}`);
      if (!token) return;
      const okay = await checkToken(challengeId, token);
      if (!okay) {
        alert("Sorry, that token is not valid. Please check your work.");
        return;
      }
      if (llState.tokensRedeemed.includes(token)) {
        alert("That token has already been redeemed.");
        return;
      }
      setLLState({
        ...llState,
        tokensRedeemed: [...llState.tokensRedeemed, token],
      });
      alert("Congratulations! You have redeemed a token.");
    },
    [llState, setLLState]
  );

  const [redeemedChallengeIds, setRedeemedChallengeIds] = useState<string[]>(
    []
  );
  useEffect(() => {
    (async () => {
      const r: string[] = [];
      for (const token of llState.tokensRedeemed) {
        const tokenHash = await sha1(token);
        const validTokenHash = validTokenHashes.find(
          (h) => h.tokenHash === tokenHash
        );
        if (validTokenHash) {
          r.push(validTokenHash.id);
        }
      }
      setRedeemedChallengeIds(r);
    })();
  }, [llState.tokensRedeemed]);

  const W = Math.min(width - 100, 800);
  const padding = 20;
  const L = (width - W) / 2 - padding;
  const T = 50;
  const bg1 = "#f0f0ff";
  const bg2 = "#ffffff";
  return (
    <div style={{ position: "absolute", width, height, overflowY: "auto", backgroundColor: bg1, overflowX: 'hidden' }}>
      <div
        style={{ position: "absolute", left: 0, top: 20, width, height: T, textAlign: "center", color: 'green' }}
      >
        * You have earned {redeemedChallengeIds.length} tokens. *
      </div>
      <div
        style={{
          position: "absolute",
          width: W,
          left: L,
          top: T,
          padding,
          backgroundColor: bg2,
          overflowX: 'hidden'
        }}
      >
        <Markdown
          source={mainMd}
          onLinkClick={(href: string) => {
            if (href.startsWith("#submit-")) {
              const challengeId = href.slice("#submit-".length);
              handleSubmitToken(challengeId);
            } else {
              window.open(href, "_blank");
            }
          }}
          redeemedChallengeIds={redeemedChallengeIds}
          imgWidth={Math.min(W - 50, 350)}
        />
      </div>
    </div>
  );
};

const validTokenHashes: {
  id: string;
  label: string;
  tokenHash: string;
}[] = [
  {
    id: "A762",
    label: "Create a text file",
    tokenHash: "9eb62c89df72e9998b7332a3c000c19f0a74129c",
  },
  {
    id: "A821",
    label: "Edit a text file",
    tokenHash: "a4d6983352a3eefca423f3461836eb5644d7be61",
  },
  {
    id: "A285",
    label: "Create a directory",
    tokenHash: "d80870e1423b3f3b8ab3025caf3806e52407267f",
  },
  {
    id: "A942",
    label: "Download and unpack a gzipped tar file",
    tokenHash: "a214d8276e511db59982dc85fadc33d211ba7550",
  },
  {
    id: "A742",
    label: "Rename a file or directory",
    tokenHash: "d74b83d9a1e607228b5f856c01d783cc58efd6b3",
  },
  {
    id: "A454",
    label: "Copy a file",
    tokenHash: "7a2a48e1b7872dcbf398552e5f333495ce28f87f",
  },
  {
    id: "A635",
    label: "Environment variables",
    tokenHash: "22ee53127f1507ab12c7b5ae95063b1f6d57d1dc",
  },
];

const checkToken = async (challengeId: string, token: string) => {
  const tokenHash = await sha1(token);
  const validTokenHash = validTokenHashes.find((h) => h.id === challengeId);
  if (!validTokenHash) return false;
  return tokenHash === validTokenHash.tokenHash;
};

const sha1 = async (s: string) => {
  const msgUint8 = new TextEncoder().encode(s);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};
