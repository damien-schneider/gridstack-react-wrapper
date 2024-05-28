import { type ReactNode, useContext, useLayoutEffect, useRef } from "react";
import { GridstackContext } from "./gridstack-context";

import type { GridStackWidget } from "gridstack";
import { cn } from "./utils/cn";

interface GridstackItemProps extends Partial<GridStackWidget> {
	children: ReactNode;
	className?: string;
}

// GridstackItem component
export const GridstackItem: React.FC<GridstackItemProps> = ({
	children,
	className,
	...options
}) => {
	const itemRef = useRef<HTMLDivElement>(null);
	const { gridRef } = useContext(GridstackContext);

	useLayoutEffect(() => {
		const element = itemRef.current;

		if (!gridRef.current || !element) {
			console.log(gridRef.current, element);

			console.log(
				"Grid instance or itemRef is not ready:",
				gridRef.current,
				element,
			);
			return;
		}

		console.log("Running batchUpdate and makeWidget");
		gridRef.current.makeWidget(element, options); // Ensure item properties are used if provided

		const gridInstance = gridRef.current;

		return () => {
			gridInstance?.removeWidget(element, false); // Pass `false` to not remove from DOM, as React will handle it
		};
	}, [gridRef, options]);

	return (
		<div
			ref={itemRef}
			className={cn("grid-stack-item bg-red-100 rounded-lg", className)}
		>
			<div className="grid-stack-item-content">{children}</div>
		</div>
	);
};
