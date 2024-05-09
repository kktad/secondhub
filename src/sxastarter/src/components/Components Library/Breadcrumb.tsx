import { ComponentProps } from "lib/component-props";
type Breadcrumb = {
    name: string,
    url: string,
    children: Breadcrumb[]
};

interface Fields {
    seperator: {
        value: string
    };
    items: Breadcrumb[];
}
type BreadcrumbProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: BreadcrumbProps): JSX.Element => {
    console.log(props)
    return (
        <div className="">
            <span>
                Breadcrumb Test
            </span>
        </div>
    );
}