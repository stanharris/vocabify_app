// @flow
import React, { PureComponent } from 'react';

import './styles.css';

class DefinitionList extends PureComponent<{}> {
  renderDefinitionList = () =>
    this.props.definitionList.map((item, index) => {
      const { definition, example } = item;
      const hasDefinition = Boolean(definition);
      const hasExample = Boolean(example);
      return (
        <div className="definition-item">
          <span className="definition-index">{index + 1}.</span>
          {hasDefinition && <p className="definition-text">{definition}</p>}
          {hasExample && (
            <p className="definition-example">&quot;{example}&quot;</p>
          )}
        </div>
      );
    });

  render() {
    const { definitionList } = this.props;
    if (!definitionList) {
      return null;
    }
    return <div className="definition-list">{this.renderDefinitionList()}</div>;
  }
}

export default DefinitionList;
