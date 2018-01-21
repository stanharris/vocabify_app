import React, { PureComponent } from "react";

import "./styles.css";

class DefinitionList extends PureComponent {
  render() {
    const { dictionaryData } = this.props;
    if (!dictionaryData) {
      return null;
    }
    return dictionaryData.map(item => {
      const { lexicalCategory, definitionList } = item;
      const definitionListElement = definitionList.map((defItem, index) => {
        const { definition, example } = defItem;
        const hasDefinition = Boolean(definition);
        const hasExample = Boolean(example);
        if (index < 2) {
          return (
            <div className="definition-item">
              <span className="definition-index">{index + 1}.</span>
              {hasDefinition && <p className="definition-text">{definition}</p>}
              {hasExample && (
                <p className="definition-example">&quot;{example}&quot;</p>
              )}
            </div>
          );
        }
        return null;
      });
      return (
        <div className="definition-list">
          <p className="lexical-category">{lexicalCategory}</p>
          {definitionListElement}
        </div>
      );
    });
  }
}

export default DefinitionList;
