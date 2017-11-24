import React, { PureComponent } from "react";
import { v4 } from "node-uuid";

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
            <div className="definition-item" key={v4()}>
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
        <div className="definition-list" key={v4()}>
          <p className="lexical-category">{lexicalCategory}</p>
          {definitionListElement}
        </div>
      );
    });
  }
}

export default DefinitionList;
