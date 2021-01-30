//Funkcja zwraca style style aktyqwnego elementu

var findSelectedItem = function(getElementToEdit, getWorkplaceData) {
  let parameters = {
    style: {},
    kindOfSelectedItem: 0,
    sectionIndex: -1,
    columnIndex: -1,
    itemIndex: -1,
  }
  //first find section
  let selectedElement = getElementToEdit.split('-')[0];
  parameters.sectionIndex = getWorkplaceData
    .sections.findIndex(x => x.id === selectedElement);

  parameters.kindOfSelectedItem = 1;

  //find column if it is selected
  if(getElementToEdit.includes("col")){
    selectedElement = getElementToEdit.split('-item_0')[0]
    parameters.columnIndex = getWorkplaceData
      .sections[parameters.sectionIndex]
      .columns.findIndex(x => x.id === selectedElement);

    parameters.kindOfSelectedItem = 2;
  }
  //find item if it is selected
  if(getElementToEdit.includes("item")){
    parameters.itemIndex = getWorkplaceData
      .sections[parameters.sectionIndex]
      .columns[parameters.columnIndex]
      .childs.findIndex(x => x.id === getElementToEdit);

    parameters.kindOfSelectedItem = 3;
  }

  switch (parameters.kindOfSelectedItem) {
    case 1:
      parameters.style = getWorkplaceData
        .sections[parameters.sectionIndex].style
      break;

    case 2:
      parameters.style = getWorkplaceData
        .sections[parameters.sectionIndex]
        .columns[parameters.columnIndex].style;
      break;

    case 3:
      parameters.style = getWorkplaceData
        .sections[parameters.sectionIndex]
        .columns[parameters.columnIndex]
        .childs[parameters.itemIndex].style;
      break;

    default:
      break;
  }
  return parameters
}

export { findSelectedItem };