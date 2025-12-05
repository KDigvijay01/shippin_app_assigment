const KEY = 'shipping_boxes_v1'
import MULTIPLIERS from '../data/multipliers'


export function loadBoxes() {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return []
        return JSON.parse(raw)
    } catch (e) {
        console.error('failed to load boxes', e)
        return []
    }
}


export function saveBoxes(boxes) {
    localStorage.setItem(KEY, JSON.stringify(boxes))
}


export function calculateCost(weight, country) {
    const multiplier = MULTIPLIERS[country] || 0
    const cost = Number((Number(weight) * multiplier).toFixed(2))
    return cost
}


export function addBox(box) {
    const boxes = loadBoxes()
    const newBox = { id: Date.now(), ...box }
    boxes.push(newBox)
    saveBoxes(boxes)
    return newBox
}