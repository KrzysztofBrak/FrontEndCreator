var dezactivateEverything = function(x) {
        x.sections.forEach(section => {
        section.columns.forEach(column => {
          column.childs.forEach(item => {
            item.isActive = false;
          })
        })
      });
}

export { dezactivateEverything };