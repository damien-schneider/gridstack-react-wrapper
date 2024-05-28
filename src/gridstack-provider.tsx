import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.css";
import {
	GridStack,
	type GridStackNode,
	type GridStackOptions,
} from "gridstack";
import {
	useRef,
	type ReactNode,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import { GridstackContext } from "./gridstack-context";

interface Props {
	children: ReactNode;
	options?: GridStackOptions;
	onGridChange?: (items: GridStackNode[]) => void;
}

export const GridstackProvider = ({ children, options }: Props) => {
	const gridInstanceRef = useRef<GridStack>();

	const [gridOptions, setGridOptions] = useState(options);
	const [gridRoot, setGridRoot] = useState<HTMLElement | null>(null);
	const [isInit, setIsInit] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (gridInstanceRef.current && isInit) {
			gridInstanceRef.current.batchUpdate();
			gridInstanceRef.current.commit();
		} else if (gridRoot && gridOptions) {
			gridInstanceRef.current = GridStack.init(gridOptions, gridRoot);
			setIsInit(true);
		}
	}, [isInit, gridRoot, gridOptions]);

	const GridStackContextApi = useMemo(
		() => ({
			gridRef: gridInstanceRef,
			setGridOption: (options: GridStackOptions) => {
				if (!gridInstanceRef.current) {
					setGridOptions(options);
				}
			},
			setGridRoot: (root: HTMLElement) => {
				if (!gridInstanceRef.current) {
					setGridRoot(root);
				}
			},
			column: (count: number) => {
				gridInstanceRef.current?.column(count);
				console.log(`Column count set to ${count}`);
			},
			addWidget: (node: GridStackNode) => {
				gridInstanceRef.current?.addWidget(node);
			},
		}),
		[],
	);

	return (
		<GridstackContext.Provider value={GridStackContextApi}>
			{children}
		</GridstackContext.Provider>
	);
};
