import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBox, calculateCost } from '../services/localStore'
import MULTIPLIERS from '../data/multipliers'

const COUNTRIES = Object.keys(MULTIPLIERS)

function hexToRGB(hex) {
    const h = (hex || '#ffffff').replace('#', '')
    const r = parseInt(h.substring(0, 2), 16)
    const g = parseInt(h.substring(2, 4), 16)
    const b = parseInt(h.substring(4, 6), 16)
    return `rgb(${r}, ${g}, ${b})`
}

export default function BoxForm() {
    const [form, setForm] = useState({
        receiverName: '',
        weight: '',
        color: '#ffffff',
        country: COUNTRIES[0]
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const [colorOpen, setColorOpen] = useState(false)
    const colorRef = useRef(null)

    useEffect(() => {
        function onDocClick(e) {
            if (colorRef.current && !colorRef.current.contains(e.target)) {
                setColorOpen(false)
            }
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [])

    //validator used to enable/disable submit button.
    function checkValid() {
        if (!form.receiverName || !form.receiverName.trim()) return false
        if (form.weight === '' || isNaN(form.weight)) return false
        if (Number(form.weight) < 0) return false
        if (!form.color) return false
        if (!form.country) return false
        return true
    }

    // Full validate that sets errors; used only on submit
    function validate() {
        const e = {}
        if (!form.receiverName || !form.receiverName.trim()) e.receiverName = 'Receiver name is required'
        if (form.weight === '' || isNaN(form.weight)) e.weight = 'Weight is required and must be a number'
        if (Number(form.weight) < 0) e.weight = 'Negative weights are not permitted'
        if (!form.color) e.color = 'Color is required'
        if (!form.country) e.country = 'Destination country is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        setMessage('')
        if (!validate()) return
        if (Number(form.weight) < 0) {
            setForm(prev => ({ ...prev, weight: 0 }))
            setErrors({ weight: 'Negative value not permitted. Reset to 0.' })
            return
        }

        const payload = {
            receiverName: form.receiverName.trim(),
            weight: Number(form.weight),
            color: hexToRGB(form.color),
            country: form.country,
            cost: calculateCost(Number(form.weight), form.country)
        }
        try {
            addBox(payload)
            setMessage('Saved successfully')
            setForm({ receiverName: '', weight: '', color: '#ffffff', country: COUNTRIES[0] })
            setErrors({})
            setTimeout(() => navigate('/list'), 700)
        } catch (err) {
            console.error(err)
            setMessage('Failed to save')
        }
    }

    useEffect(() => {
        setIsValid(checkValid())
    }, [form])

    return (
        <div className="card">
            <h2>Add Shipping box</h2>
            <form onSubmit={handleSubmit} className="form form-grid" noValidate>
                <label className="label-row">
                    <span className="label-text">Receiver name</span>
                    <div className="control-col">
                        <input
                            name="receiverName"
                            value={form.receiverName}
                            onChange={(e) => setForm(prev => ({ ...prev, receiverName: e.target.value }))}
                            autoComplete="off"
                        />
                        <div className="field-error">{errors.receiverName || '\u00A0'}</div>
                    </div>
                </label>

                <label className="label-row">
                    <span className="label-text">Weight (kg)</span>
                    <div className="control-col">
                        <input
                            name="weight"
                            type="number"
                            step="0.01"
                            value={form.weight}
                            onChange={(e) => setForm(prev => ({ ...prev, weight: e.target.value }))}
                            inputMode="decimal"
                        />
                        <div className="field-error">{errors.weight || '\u00A0'}</div>
                    </div>
                </label>
                <label className="label-row" ref={colorRef}>
                    <span className="label-text">Box colour</span>

                    <div className="control-col" style={{ position: "relative" }}>
                        <div className="color-picker-row">
                            <button
                                type="button"
                                className="color-swatch"
                                onClick={() => document.getElementById("hiddenColorInput").click()}
                                style={{ background: form.color }}
                                aria-label="Choose color"
                            />
                            <input
                                id="hiddenColorInput"
                                type="color"
                                style={{ visibility: "hidden", width: 0, height: 0, padding: 0, border: "none" }}
                                value={form.color}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, color: e.target.value }))
                                }
                            />

                            <input
                                className="color-hex"
                                value={form.color}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, color: e.target.value }))
                                }
                            />

                        </div>

                        <div className="field-error">{errors.color || "\u00A0"}</div>
                    </div>
                </label>
                <label className="label-row">
                    <span className="label-text">Destination country</span>
                    <div className="control-col">
                        <select
                            value={form.country}
                            onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
                        >
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c} (₹{MULTIPLIERS[c]})</option>
                            ))}
                        </select>
                        <div className="field-error">{errors.country || '\u00A0'}</div>
                    </div>
                </label>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        className={`submit-btn ${!isValid ? 'disabled-btn' : ''}`}
                    >
                        Save
                    </button>
                    {message && <div className="message">{message}</div>}
                </div>
            </form>
        </div>
    )
}
