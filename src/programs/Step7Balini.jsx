import React from 'react';

export default function AssessmentItem({
  id,
//   group,
  label1,
  label2,
  value,
  description,
  onChange
}) {
  // alert(label1)

  
  const handleSelect = (selected) => {
    onChange(id, 'choice', selected);
    onChange(id, 'label1', label1);
    onChange(id, 'label2', label2);
  };

  const handleDescriptionChange = (e) => {
    onChange(id, 'description', e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {/* {group} */}
      </h3>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleSelect('option1')}
          className={`
            border rounded px-3 py-2 text-right
            ${value === 'option1' ? 'bg-green-500 text-white' : 'bg-white border-gray-300'}
            hover:border-green-400
          `}
        >
          {label1}
        </button>

        <button
          type="button"
          onClick={() => handleSelect('option2')}
          className={`
            border rounded px-3 py-2 text-right
            ${value === 'option2' ? 'bg-red-500 text-white' : 'bg-white border-gray-300'}
            hover:border-red-400
          `}
        >
          {label2}
        </button>
      </div>

      <label className="flex flex-col mt-4">
        <span className="mb-1">توضیحات</span>
        <textarea
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="توضیحات خود را وارد کنید..."
          rows={4}
        />
      </label>
    </div>
  );
}
