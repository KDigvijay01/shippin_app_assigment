import React, { useEffect, useState } from 'react'
import { loadBoxes, saveBoxes } from '../services/localStore'

export default function BoxList(){
  const [boxes, setBoxes] = useState([])

  useEffect(()=>{
    setBoxes(loadBoxes())
  },[])

  function handleClearAll(){
    if (!confirm('Clear all saved boxes?')) return
    saveBoxes([])
    setBoxes([])
  }

  return (
    <div className="card">
      <h2>Boxes</h2>
      {boxes.length === 0 ? (
        <div>No boxes captured yet</div>
      ) : (
        <div>
          <div style={{textAlign:'right', marginBottom:10}}>
            <button onClick={handleClearAll}>Clear all</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Receiver</th>
                  <th>Weight (kg)</th>
                  <th>Color</th>
                  <th>Country</th>
                  <th>Shipping Cost (INR)</th>
                </tr>
              </thead>
              <tbody>
                {boxes.map(b=> (
                  <tr key={b.id}>
                    <td>{b.receiverName}</td>
                    <td>{b.weight}</td>
                    <td><div style={{width:32,height:24,background:b.color,border:'1px solid #ccc'}}/></td>
                    <td>{b.country}</td>
                    <td>₹{Number(b.cost).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
