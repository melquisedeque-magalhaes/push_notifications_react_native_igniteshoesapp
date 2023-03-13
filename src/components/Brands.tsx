import { FlatList } from 'native-base';
import { useBrandsStore } from '../store/useBrandsStore';

import { Brand } from './Brand';

type Props = {
  onSelect: (value: string) => void;
  selected: string;
}

export function Brands({ onSelect, selected }: Props) {

  const { brands } = useBrandsStore()

  return (
    <FlatList
      data={brands}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Brand
          image={item.image}
          isActive={selected === item.name}
          onPress={() => onSelect(item.name)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{ px: 8 }}
      mt={10}
      maxH={10}
      minH={10}
    />
  );
}