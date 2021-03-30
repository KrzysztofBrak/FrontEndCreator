var dezactivateEverything = function(x) {
        x.sections.forEach(section => {
        section.columns.forEach(column => {
          column.childs.forEach(item => {
            item.isActive = false;
          })
          column.isActive = false;
        })
        section.isActive = false;
      });
}

export { dezactivateEverything };