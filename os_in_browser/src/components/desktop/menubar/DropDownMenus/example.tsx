import Dropdown from "./index";

export const OpenProgrammatically = () => {
  let meDiv: any;

  function onClick(e: MouseEvent) {
    if (meDiv) {
      meDiv.handleButtonOnClick(e);
    }
  }

  return (
    <div
      style={{
        marginLeft: 400,
        display: "flex",
        "flex-direction": "column",
        background: "transparent",
      }}
    >
      <Dropdown title="File" ref={meDiv}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
        <Dropdown.Item>
          Item 4 with sub
          <Dropdown.Submenu>
            <Dropdown.Item>
              Sub item 1 with sub
              <Dropdown.Submenu>
                <Dropdown.Item>Sub Sub 1</Dropdown.Item>
                <Dropdown.Item>Sub Sub 2</Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item>Sub item 2</Dropdown.Item>
            <Dropdown.Item>
              Sub item 3 with sub
              <Dropdown.Submenu>
                <Dropdown.Item>Sub Sub 1</Dropdown.Item>
                <Dropdown.Item>Sub Sub 2</Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
          </Dropdown.Submenu>
        </Dropdown.Item>
        <Dropdown.Item>Item 5</Dropdown.Item>
        <Dropdown.Item>Item 6</Dropdown.Item>
      </Dropdown>
    </div>
  );
};
