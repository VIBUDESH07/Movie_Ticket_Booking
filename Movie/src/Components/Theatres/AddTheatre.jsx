import { useState } from 'react';
import axios from 'axios';

export const AddTheatre = () => {
  const [theatreData, setTheatreData] = useState({
    name: '',
    location: '',
    seatingCapacity: 0,
    panels: [
      {
        panelName: '',
        rows: [{ cols: 5, category: 'Standard' }],
      },
    ],
    admins: '',
  });

  const calculateTotalSeats = () => {
    return theatreData.panels.reduce(
      (total, panel) => total + panel.rows.reduce((rowTotal, row) => rowTotal + row.cols, 0),
      0
    );
  };

  const handlePanelChange = (index, field, value) => {
    const updatedPanels = theatreData.panels.map((panel, i) =>
      i === index ? { ...panel, [field]: value } : panel
    );
    setTheatreData({ ...theatreData, panels: updatedPanels });
  };

  const handleRowChange = (panelIndex, rowIndex, field, value) => {
    const updatedPanels = theatreData.panels.map((panel, i) => {
      if (i === panelIndex) {
        const updatedRows = panel.rows.map((row, j) =>
          j === rowIndex ? { ...row, [field]: field === 'cols' ? Number(value) : value } : row
        );
        return { ...panel, rows: updatedRows };
      }
      return panel;
    });
    setTheatreData({ ...theatreData, panels: updatedPanels });
  };

  const addRow = (panelIndex) => {
    const updatedPanels = theatreData.panels.map((panel, i) =>
      i === panelIndex ? { ...panel, rows: [...panel.rows, { cols: 5, category: 'Standard' }] } : panel
    );
    setTheatreData({ ...theatreData, panels: updatedPanels });
  };

  const removeRow = (panelIndex, rowIndex) => {
    const updatedPanels = theatreData.panels.map((panel, i) => {
      if (i === panelIndex) {
        const updatedRows = panel.rows.filter((_, j) => j !== rowIndex);
        return { ...panel, rows: updatedRows };
      }
      return panel;
    });
    setTheatreData({ ...theatreData, panels: updatedPanels });
  };

  const addPanel = () => {
    setTheatreData({
      ...theatreData,
      panels: [...theatreData.panels, { panelName: '', rows: [{ cols: 5, category: 'Standard' }] }],
    });
  };

  const removePanel = (index) => {
    const updatedPanels = theatreData.panels.filter((_, i) => i !== index);
    setTheatreData({ ...theatreData, panels: updatedPanels });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalSeats = calculateTotalSeats();
    const dataToSend = { ...theatreData, seatingCapacity: totalSeats };

    try {
      await axios.post('http://localhost:5000/add-theatre', dataToSend);
      alert('Theatre added successfully!');
      setTheatreData({
        name: '',
        location: '',
        seatingCapacity: 0,
        panels: [{ panelName: '', rows: [{ cols: 5, category: 'Standard' }] }],
        admins: '',
      });
    } catch (error) {
      alert('Failed to add theatre');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Theatre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Theatre Name</label>
          <input
            type="text"
            value={theatreData.name}
            onChange={(e) => setTheatreData({ ...theatreData, name: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={theatreData.location}
            onChange={(e) => setTheatreData({ ...theatreData, location: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-bold">Panels</h3>
          {theatreData.panels.map((panel, panelIndex) => (
            <div key={panelIndex} className="border p-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Panel Name</label>
                <input
                  type="text"
                  value={panel.panelName}
                  onChange={(e) => handlePanelChange(panelIndex, 'panelName', e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <h4 className="mt-4 font-medium">Rows</h4>
              {panel.rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-4 items-center mb-2">
                  <div>
                    <label className="block text-sm font-medium">Columns</label>
                    <input
                      type="number"
                      value={row.cols}
                      onChange={(e) => handleRowChange(panelIndex, rowIndex, 'cols', e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      value={row.category}
                      onChange={(e) => handleRowChange(panelIndex, rowIndex, 'category', e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full"
                    >
                      <option value="Standard">Standard</option>
                      <option value="VIP">VIP</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRow(panelIndex, rowIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove Row
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(panelIndex)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Row
              </button>
              <button
                type="button"
                onClick={() => removePanel(panelIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove Panel
              </button>
            </div>
          ))}
          <button type="button" onClick={addPanel} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Panel
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Theatre
        </button>
      </form>
    </div>
  );
};
