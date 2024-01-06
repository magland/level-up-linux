/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWindowDimensions } from '@fi-sci/misc'
import { useEffect, useState } from 'react'
import { MainWindow } from './MainWindow/MainWindow'
import { LLState, getLLStateFromStorage, setLLStateToStorage } from './types'

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
  const {width, height} = useWindowDimensions()
  return (
    <MainWindow width={width} height={height} llState={llState} setLLState={setLLState} />
  )
}

// type TokenSubmissionComponentProps = {
//   llState: LLState
//   setLLState: (state: LLState) => void
// }

// const TokenSubmissionComponent: FunctionComponent<TokenSubmissionComponentProps> = ({llState, setLLState}) => {
//   const [submittedText, setSubmittedText] = useState('')
//   const [response, setResponse] = useState('')
//   const onSubmit = useCallback(async () => {
//     setResponse('')
//     const okay = await checkToken(submittedText)
//     if (!okay) {
//       setResponse('Invalid token')
//       return
//     }
//     if (llState.tokensRedeemed.includes(submittedText)) {
//       setResponse('Token already redeemed')
//       return
//     }
//     setLLState({
//       ...llState,
//       tokensRedeemed: [...llState.tokensRedeemed, submittedText]
//     })
//     setResponse('Token redeemed!')
//     setSubmittedText('')
//   }, [submittedText, llState, setLLState])

//   return (
//     <div>
//       <input
//         type="text"
//         value={submittedText}
//         onChange={e => setSubmittedText(e.target.value)}
//       />
//       <button onClick={onSubmit}>Submit</button>
//       <div>{response}</div>
//     </div>
//   )
// }

export default App
