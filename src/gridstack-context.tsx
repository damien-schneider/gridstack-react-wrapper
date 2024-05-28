import type { GridStack, GridStackNode, GridStackOptions } from "gridstack";
import { type RefObject, createContext, createRef, useContext } from "react";

interface IGridStackContext {
	gridRef: RefObject<GridStack | undefined>;
	setGridOption: (options: GridStackOptions) => void;
	setGridRoot: (root: HTMLElement) => void;
	column: (count: number) => void;
	addWidget: (node: GridStackNode) => void;
}

export const GridstackContext = createContext<IGridStackContext>({
	gridRef: createRef<GridStack | undefined>(),
	setGridOption: () => {
		throw new Error("setGridOption not implemented");
	},
	setGridRoot: () => {
		throw new Error("setGridRoot not implemented");
	},
	column: () => {
		throw new Error("column not implemented");
	},
	addWidget: () => {
		throw new Error("addWidget not implemented");
	},
});

export const useGridstackContext = () => {
	const context = useContext(GridstackContext);
	if (context === undefined) {
		throw new Error(
			"useGridstackContext must be used within a GridstackContext",
		);
	}
	return context;
};
