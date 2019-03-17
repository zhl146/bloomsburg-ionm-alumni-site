export const arrToMap = (mapItemToKey, arr) =>
    arr.reduce((map, item) => {
        const key = mapItemToKey(item)
        return key ? { ...map, [mapItemToKey(item)]: true } : map
    }, {})
