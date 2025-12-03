import React from 'react'
export default function Table({ cols=[], rows=[] }){
  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            {cols.map(c=> (
              <th
                key={c}
                style={{ textAlign: 'center' }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              {cols.map(c=> ( 
                <td key={c}>
                  {String(r[c] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}