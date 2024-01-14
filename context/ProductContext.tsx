import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

type BooleanState = [boolean, Dispatch<SetStateAction<boolean>>];

type ProductContextType = {
    filterSidebar: BooleanState;
    filterLeft: BooleanState;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const GetProductContext = () =>
    useContext(ProductContext) as ProductContextType;

export function ProductProvider({ children }: { children: ReactNode }) {
    const filterLeft = useState(true);
    const filterSidebar = useState(false);
    return (
        <ProductContext.Provider value={{ filterLeft, filterSidebar }}>
            {children}
        </ProductContext.Provider>
    );
}
