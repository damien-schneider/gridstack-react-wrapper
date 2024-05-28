import { useContext, useLayoutEffect, useRef } from "react";
import { GridstackContext } from "./gridstack-context";

interface Props {
	children: React.ReactNode;
}

export const GridstackWrapper = ({ children }: Props) => {
	const { setGridRoot } = useContext(GridstackContext);
	const gridHTMLElementRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (gridHTMLElementRef.current) {
			setGridRoot(gridHTMLElementRef.current);
		}
	}, [setGridRoot]);

	return (
		<div ref={gridHTMLElementRef} className="grid-stack">
			{children}
		</div>
	);
};
