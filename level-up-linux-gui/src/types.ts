/* eslint-disable @typescript-eslint/no-explicit-any */
export type LLState = {
  tokensRedeemed: string[];
};

export const isValidLLState = (state: any): state is LLState => {
  if (!state) return false;
  try {
    return (
      typeof state === "object" &&
      Array.isArray(state.tokensRedeemed) &&
      state.tokensRedeemed.every((token: any) => typeof token === "string")
    );
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getLLStateFromStorage = (): LLState => {
  const k = "level-up-linux-state";
  try {
    const s = JSON.parse(localStorage.getItem(k) || '{"tokensRedeemed": []}');
    if (!isValidLLState(s)) {
      throw new Error("Invalid LL state");
    }
    return s;
  } catch (err) {
    console.error(err);
    return { tokensRedeemed: [] };
  }
};

export const setLLStateToStorage = (state: LLState) => {
  const k = "level-up-linux-state";
  try {
    localStorage.setItem(k, JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
};
