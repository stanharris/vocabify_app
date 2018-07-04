import React, { PureComponent } from 'react';

import './styles.css';

class DefinitionList extends PureComponent {
  render() {
    const { definitionList } = this.props;
    if (!definitionList) {
      return null;
    }
    return definitionList.map((item, index) => {
      const { definition, examples } = item;
      const hasDefinition = Boolean(definition);
      const hasExample = Boolean(examples);
      return (
        <div>
          <div className="definition-item">
            <span className="definition-index">{index + 1}.</span>
            {hasDefinition && <p className="definition-text">{definition}</p>}
            {hasExample && (
              <p className="definition-example">&quot;{examples[0]}&quot;</p>
            )}
          </div>
        </div>
      );
    });
  }
}

export default DefinitionList;
