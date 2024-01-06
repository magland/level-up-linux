/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import './App.css'

type LLState = {
  tokensRedeemed: string[]
}

const isValidLLState = (state: any): state is LLState => {
  if (!state) return false
  try {
    return (
      typeof state === 'object' &&
      Array.isArray(state.tokensRedeemed) &&
      state.tokensRedeemed.every((token: any) => typeof token === 'string')
    )
  }
  catch (err) {
    console.error(err)
    return false
  }
}

const getLLStateFromStorage = (): LLState => {
  const k = 'level-up-linux-state'
  try {
    const s = JSON.parse(localStorage.getItem(k) || '{"tokensRedeemed": []}')
    if (!isValidLLState(s)) {
      throw new Error('Invalid LL state')
    }
    return s
  } catch (err) {
    console.error(err)
    return {tokensRedeemed: []}
  }
}

const setLLStateToStorage = (state: LLState) => {
  const k = 'level-up-linux-state'
  try {
    localStorage.setItem(k, JSON.stringify(state))
  } catch (err) {
    console.error(err)
  }
}

function App() {
  const [llState, setLLState] = useState<LLState>({tokensRedeemed: []})
  const [llStateLoaded, setLLStateLoaded] = useState(false)
  useEffect(() => {
    setLLState(getLLStateFromStorage())
    setLLStateLoaded(true)
  }, [])
  useEffect(() => {
    if (!llStateLoaded) return
    setLLStateToStorage(llState)
  }, [llState, llStateLoaded])
  return (
    <div>
      <div>
        You have redeemed {llState.tokensRedeemed?.length || 0} tokens
      </div>
      <TokenSubmissionComponent
        llState={llState}
        setLLState={setLLState}
      />
      <div>
        <a href="https://github.com/magland/level-up-linux" target='_blank' rel="noreferrer">Level Up Linux</a>
      </div>
    </div>
  )
}

type TokenSubmissionComponentProps = {
  llState: LLState
  setLLState: (state: LLState) => void
}

const TokenSubmissionComponent: FunctionComponent<TokenSubmissionComponentProps> = ({llState, setLLState}) => {
  const [submittedText, setSubmittedText] = useState('')
  const [response, setResponse] = useState('')
  const onSubmit = useCallback(async () => {
    setResponse('')
    const okay = await checkToken(submittedText)
    if (!okay) {
      setResponse('Invalid token')
      return
    }
    if (llState.tokensRedeemed.includes(submittedText)) {
      setResponse('Token already redeemed')
      return
    }
    setLLState({
      ...llState,
      tokensRedeemed: [...llState.tokensRedeemed, submittedText]
    })
    setResponse('Token redeemed!')
    setSubmittedText('')
  }, [submittedText, llState, setLLState])

  return (
    <div>
      <input
        type="text"
        value={submittedText}
        onChange={e => setSubmittedText(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
      <div>{response}</div>
    </div>
  )
}

const validTokenHashes: {
  id: string
  label: string
  tokenHash: string
}[] = [
  {
    id: 'A762',
    label: 'Create a text file',
    tokenHash: '9eb62c89df72e9998b7332a3c000c19f0a74129c'
  },
  {
    id: 'A821',
    label: 'Edit a text file',
    tokenHash: 'a4d6983352a3eefca423f3461836eb5644d7be61'
  },
  {
    id: 'A285',
    label: 'Create a directory',
    tokenHash: 'd80870e1423b3f3b8ab3025caf3806e52407267f'
  },
  {
    id: 'A942',
    label: 'Download and unpack a gzipped tar file',
    tokenHash: 'a214d8276e511db59982dc85fadc33d211ba7550'
  },
  {
    id: 'A742',
    label: 'Rename a file or directory',
    tokenHash: 'd74b83d9a1e607228b5f856c01d783cc58efd6b3'
  },
  {
    id: 'A454',
    label: 'Copy a file',
    tokenHash: '7a2a48e1b7872dcbf398552e5f333495ce28f87f'
  },
  {
    id: 'A635',
    label: 'Environment variables',
    tokenHash: '22ee53127f1507ab12c7b5ae95063b1f6d57d1dc'
  }
]

const checkToken = async (token: string) => {
  return validTokenHashes.map(x => x.tokenHash).includes(await sha1(token))
}

const sha1 = async (s: string) => {
  const msgUint8 = new TextEncoder().encode(s)
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export default App
