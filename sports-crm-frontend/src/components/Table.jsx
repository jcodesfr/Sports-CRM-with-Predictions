import React from 'react'

export default function Table({ cols = [], rows = [], colLabels = {} }) {
  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                style={{ textAlign: 'center' }}
              >
                {colLabels[c] ?? c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td
                  key={c}
                  style={{ textAlign: 'center' }}
                >
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
