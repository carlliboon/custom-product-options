import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique keys

export default function App() {
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("option");

  const addOption = () => {
    const newOption = {
      id: uuidv4(), // Generate a unique id for the option
      title: optionName,
    };
    setOptions([...options, newOption]);
    setOptionName("option"); // Reset the optionName state for the next new option
  };

  return (
    <div className="container">
      <div className="custom-col">
        <h3>Product Options</h3>
        <div>
          <OptionConfigList
            content={options}
            optionName={optionName}
            onSetOptionName={setOptionName}
          />
        </div>
        <button className="btn btn-add-options" onClick={addOption}>
          Add options
        </button>
      </div>
      <div className="custom-col">
        <h3>Preview</h3>
      </div>
    </div>
  );
}

function OptionConfigList({ content, optionName, onSetOptionName }) {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className="accordion">
      {content.map((el, i) => (
        <OptionConfig
          num={i}
          title={el.title}
          key={el.id} // Use the unique id as the key
          curOpen={curOpen}
          onOpen={setIsOpen}
          optionName={optionName}
          onSetOptionName={onSetOptionName}
        >
          {el.text}
        </OptionConfig>
      ))}
    </div>
  );
}

function OptionConfig({
  num,
  title,
  curOpen,
  onOpen,
  children,
  optionName,
  onSetOptionName,
}) {
  const isOpen = num === curOpen;

  function handleIsOpen(num) {
    onOpen(isOpen ? null : num);
  }

  // State to manage active tab for this option
  const [activeTab, setActiveTab] = useState("tab1");

  // Function to handle tab change for this option
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div
        className={`item ${isOpen ? "open" : ""}`}
        onClick={() => handleIsOpen(num)}
      >
        <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
        <p className="title">{title}</p>
        <p className="icon">{isOpen ? "-" : "+"}</p>
      </div>
      <div>
        {isOpen && (
          <div className="content-box">
            {children}
            <Tabs
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              optionName={optionName}
              onSetOptionName={onSetOptionName}
            />
          </div>
        )}
      </div>
    </>
  );
}

function Tabs({ activeTab, handleTabChange, optionName, onSetOptionName }) {
  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          className={`tab-title ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => handleTabChange("tab1")}
        >
          Config
          <div className="underscore" />
        </div>
        <div
          className={`tab-title ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => handleTabChange("tab2")}
        >
          Advanced
          <div className="underscore" />
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "tab1" && (
          <TabConfig
            optionName={optionName}
            onSetOptionName={onSetOptionName}
          />
        )}
        {activeTab === "tab2" && <TabAdvanced />}
      </div>
    </div>
  );
}

function TabConfig({ optionName, onSetOptionName }) {
  const handleNameChange = (e) => {
    onSetOptionName(e.target.value); // Update the optionName state in real-time
  };

  return (
    <div className="option-config">
      <div className="tab-config">
        <div className="input-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={optionName}
            onChange={handleNameChange} // Call handleNameChange function on input change
          />
          <span className="helper">
            Name of the form field where the option is stored (required)
          </span>
        </div>
        <div className="input-row">
          <label htmlFor="label">Label</label>
          <input type="text" id="label" name="label" />
          <span className="helper">Label above the form field (optional)</span>
        </div>
      </div>
      <div className="required">
        <input type="checkbox" id="isRequired" />
        <label htmlFor="isRequiredName">Required</label>
      </div>
      <div className="opt-config-value">
        <label name="value">Value</label>
        <input type="text" name="value" />
        <span className="helper">Initial value of the option</span>
      </div>
    </div>
  );
}

function TabAdvanced() {
  return (
    <div className="tab-config">
      <h1>Advanced Section</h1>
    </div>
  );
}
