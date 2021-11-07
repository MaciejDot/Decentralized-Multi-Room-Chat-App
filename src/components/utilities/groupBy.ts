
export type Group<T, TKey> = {
    key: TKey,
    elements: T[]
}


export const groupBy = <T, TKey>(array: T[],
    groupOperator: (element: T) => TKey) => {
    const result: Group<T, TKey>[] = []
    array
        .forEach(element => {
            const key = groupOperator(element);
            const index = result.findIndex(x => x.key === key);
            if (index !== -1) {
                result[index].elements.push(element)
                return;
            }
            result.push({ key, elements: [element] })
        })

    return result

}