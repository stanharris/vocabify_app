// @flow
import React, { PureComponent } from 'react';
import flatten from 'lodash/flatten';

import { DefinitionList as DefinitionListType } from '../../types';
import styles from './styles.module.css';

type Props = {
  definitionList: Array<DefinitionListType>
};

class DefinitionList extends PureComponent<Props> {
  get definitionList() {
    const flattenedList = flatten(
      this.props.definitionList.map(item => item.definitionList)
    );
    return flattenedList.filter(item => item.enabled);
  }

  renderDefinitionList = () =>
    this.definitionList.map((item, index) => {
      const { definition, example } = item;

      const hasDefinition = Boolean(definition);
      const hasExample = Boolean(example);
      return (
        <div className={styles.definitionItem}>
          <span className={styles.index}>{index + 1}.</span>
          {hasDefinition && <p className={styles.definition}>{definition}</p>}
          {hasExample && (
            <p className={styles.example}>&quot;{example}&quot;</p>
          )}
        </div>
      );
    });

  render() {
    const { definitionList } = this.props;
    if (!definitionList) {
      return null;
    }
    return (
      <div className={styles.definitionList}>{this.renderDefinitionList()}</div>
    );
  }
}

export default DefinitionList;
