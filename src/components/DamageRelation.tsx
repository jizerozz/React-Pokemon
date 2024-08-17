import React, { useEffect } from 'react';
import { DamageRelations } from '../pages/DetailPage/DetailPage';

interface DamageRelationItem {
  url: string;
  name: string;
}

interface damageProps {
  damages: DamageRelations[];
}
const DamageRelation = ({ damages }: damageProps) => {
  useEffect(() => {
    const arrayDamage = damages.map((dm) => separateObjectBetweenToAndFrom(dm));

    if (arrayDamage.length === 2) {
      //umm
    } else {
      postDamageValue(arrayDamage[0]?.from);
    }
  }, []);

  const postDamageValue = (props: Record<string, DamageRelationItem[]>) => {
    Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;
      const valuesOfKeyName: Record<string, string> = {
        double_damage: '2X',
        half_damage: '1/2X',
        no_damage: '0x',
      };

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
  };

  const separateObjectBetweenToAndFrom = (damage: DamageRelations) => {
    const from = filterDamageRelation('_from', damage);
    const to = filterDamageRelation('-_to', damage);

    return { from, to };
  };

  //from, to에 관한 데이터 나눠서 가공
  const filterDamageRelation = (
    valueFilter: string,
    damage: DamageRelations
  ) => {
    const res = Object.entries(damage)
      .filter(([KeyName, value]) => {
        return KeyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, ' ');
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});

    return res;
  };

  return <div></div>;
};

export default DamageRelation;
