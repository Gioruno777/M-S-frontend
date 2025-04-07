export type BurgerType = {
    _id: string
    name: string,
    description: string,
    image: string,
    price: number,
    calories: number,
    protein: number,
    fat: number,
    saturatedFat: number,
    transFat: number,
    carbohydrates: number,
    sodium: number,
    seasonal: boolean,
    limited: Boolean,
}

export type foodType = {
    _id: string
    name: string,
    description: string,
    image: string,
    price: number,
    calories: number,
    protein: number,
    fat: number,
    saturatedFat: number,
    transFat: number,
    carbohydrates: number,
    sodium: number,
    seasonal: boolean,
    limited: Boolean,
    category: string
}

export type ItemType = {
    id: string,
    cartId: string,
    productId: string
    name: string,
    imageUrl: string,
    quantity: number,
    price: number

}

export type PurchaseType = {
    id: string,
    purchaseId: string,
    createdAt: string,
    method: string,
    amount: number
}

export type TransactionType = {
    id: string,
    transactionId: string,
    createdAt: string,
    type: string,
    amount: number,
    previousBalance: number,
    record: string
}