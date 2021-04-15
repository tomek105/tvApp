const _getDOMElem = id => {
    return document.getElementById(id)
  }
  
  export const mapListToDOMElements = listOfId => { //
    const _viewElems = {}
  
    for (const id of listOfId) {
      _viewElems[id] = _getDOMElem(id);
    }
  
    return _viewElems;
  }
  