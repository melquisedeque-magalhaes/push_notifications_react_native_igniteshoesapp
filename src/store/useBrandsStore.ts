import { create }  from 'zustand'

interface BRANDS {
    id: string 
    name: string, 
    image: string
}

interface useBrandsStoreTypes {
    brands: BRANDS[]
    setBrands: (brands: BRANDS[]) => void
}

export const useBrandsStore = create<useBrandsStoreTypes>(set => ({
    brands: [] as BRANDS[],
    setBrands: (brands: BRANDS[]) => set(() => ({ brands }))
}))