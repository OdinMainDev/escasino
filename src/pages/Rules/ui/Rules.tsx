import { PageHeader } from '@/widgets/Header';
import styles from './Rules.module.scss';
import Tabs, { ITab } from '@/entities/Tabs';
import { useState } from 'react';
import rulesAndTerms from '../data/rulesAndTerms.json';

type RuleContent = { [key: string]: string | RuleContent };

interface Rule {
  title: string;
  content: RuleContent;
}

interface RulesAndTerms {
  [key: string]: Rule;
}

const Rules = () => {
  const tabs: ITab[] = [
    {
      label: 'Общие',
      value: 'main',
    },
    {
      label: 'Бонусные',
      value: 'bonus',
    },
  ];
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  const renderContent = (content: RuleContent) => {
    return Object.entries(content).map(([key, value]) => {
      if (typeof value === 'string') {
        return (
          <div key={key}>
            <strong>{key}</strong>: {value}
          </div>
        );
      } else {
        return (
          <div key={key}>
            <strong>{key}</strong>
            <div style={{ marginLeft: '20px' }}>{renderContent(value)}</div>
          </div>
        );
      }
    });
  };

  const rules: RulesAndTerms = rulesAndTerms;
  const mainRules = Object.entries(rules).slice(0, Math.round(Object.entries(rules).length / 2));
  const bonusRules = Object.entries(rules).slice(
    Math.round(Object.entries(rules).length / 2),
    Object.entries(rules).length,
  );

  return (
    <div className={styles.container}>
      <PageHeader title="Правила и условия" />
      <Tabs value={selectedTab.value} tabs={tabs} onChange={(value) => setSelectedTab(value)} />
      {selectedTab.value === 'main' ? (
        <div className={styles.content} key="main">
          {mainRules.map(([key, rule]) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <h2>{rule.title}</h2>
              <div style={{ marginLeft: '20px' }}>{renderContent(rule.content)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.content} key="bonuses">
          {bonusRules.map(([key, rule]) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <h2>{rule.title}</h2>
              <div style={{ marginLeft: '20px' }}>{renderContent(rule.content)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rules;
