import clsx from "clsx";

type BoundedProps = {
	as?: React.ElementType;
	className?: string;
	children: React.ReactNode;
};

export default function Bounded({ as: Comp = "section", className, children, ...restProps }: BoundedProps) {
	return (
		<Comp className={clsx("py-10 md:py-14 lg:py-16", className)} {...restProps}>
			{children}
		</Comp>
	);
}
