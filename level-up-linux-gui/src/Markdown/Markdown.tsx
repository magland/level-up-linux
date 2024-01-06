/* eslint-disable @typescript-eslint/no-explicit-any */
// import "katex/dist/katex.min.css";
import { FunctionComponent, useCallback, useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as highlighterStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import rehypeKatexPlugin from 'rehype-katex';
import 'github-markdown-css/github-markdown-light.css';
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { Hyperlink } from "@fi-sci/misc";

type Props ={
	source: string
	onLinkClick?: (href: string) => void
	redeemedChallengeIds: string[];
}

const Markdown: FunctionComponent<Props> = ({source, onLinkClick, redeemedChallengeIds}) => {
	const a = useCallback(
		({/*node,*/ children, href, ...props}: any) => {
			if ((href) && (href.startsWith('#')) && (onLinkClick)) {
				if (href.startsWith('#submit-')) {
					const challengeId = href.slice('#submit-'.length)
					if (redeemedChallengeIds.includes(challengeId)) {
						return <span style={{color: 'green', fontWeight: 'bold'}}>YOU HAVE PASSED THIS CHALLENGE!</span>
					}
				}
				return <Hyperlink onClick={() => onLinkClick(href)} color="red">{children}</Hyperlink>
			}
			else {
				return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>
			}
		}
	, [onLinkClick, redeemedChallengeIds])
	const img = useCallback(
		({...props}: any) => {
			return <img {...props} width="350px" />
		}
	, [])
	const components: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> = useMemo(() => (
		{
			code: ({inline, className, children, ...props}) => {
				const match = /language-(\w+)/.exec(className || '')
				return !inline && match ? (
				<SyntaxHighlighter
					children={String(children).replace(/\n$/, '')}
					style={highlighterStyle as any}
					language={match[1]}
					PreTag="div"
					{...props}
				/>
				) : (
				<code className={className} {...props}>
					{children}
				</code>
				)
			},
			a,
			img
			// div: ({node, className, children, ...props}) => {
			// 	if (className === 'figurl-figure') {
			// 		if (internalFigureMode) {
			// 			return (
			// 				<InternalFigurlFigure
			// 					src={(props as any).src}
			// 					height={(props as any).height}
			// 				/>
			// 			)
			// 		}
			// 		else {
			// 			return (
			// 				<ExternalFigurlFigure
			// 					src={(props as any).src}
			// 					height={(props as any).height}
			// 				/>
			// 			)
			// 		}
			// 	}
			// 	else {
			// 		return <div className={className} {...props}>{children}</div>
			// 	}
			// },
			// a: ({node, children, href, ...props}) => {
			// 	if ((href) && (href.startsWith('#'))) {
			// 		return <MarkdownLink href={href}>{children}</MarkdownLink>
			// 	}
			// 	else {
			// 		return <a href={href} {...props}>{children}</a>
			// 	}
				
			// }
		}
	), [a, img])
	return (
		<div className="markdown-body">
			<ReactMarkdown
				children={source}
				// remarkPlugins={[remarkGfm, remarkMathPlugin]}
				// rehypePlugins={[rehypeRaw, rehypeMathJaxSvg/*, rehypeKatexPlugin*/]}
				components={components}
				linkTarget="_blank"
			/>
		</div>
	)
}

export default Markdown
