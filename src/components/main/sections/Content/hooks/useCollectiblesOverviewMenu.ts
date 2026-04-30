import { useMemo } from '../../../../../lib/teact/teact';
import { getActions } from '../../../../../global';

import type { OverviewCellSize } from '../../../../../global/types';
import type { DropdownItem } from '../../../../ui/Dropdown';

import buildOverviewCellSizeMenuItems from './buildOverviewCellSizeMenuItems';

import useLastCallback from '../../../../../hooks/useLastCallback';

export type CollectiblesMenuHandler = OverviewCellSize | 'hide' | 'showAssets';

export default function useCollectiblesOverviewMenu({
  overviewCellSize,
  canHide,
  isAssetCellVisible,
  hiddenCheckClassName,
}: {
  overviewCellSize?: OverviewCellSize;
  canHide: boolean;
  isAssetCellVisible: boolean;
  hiddenCheckClassName?: string;
}) {
  const { setOverviewCellSize, setAreCollectiblesHidden, setAreAssetsHidden } = getActions();

  const menuItems = useMemo<DropdownItem<CollectiblesMenuHandler>[]>(() => {
    const items: DropdownItem<CollectiblesMenuHandler>[] = [
      ...buildOverviewCellSizeMenuItems<CollectiblesMenuHandler>(overviewCellSize, hiddenCheckClassName),
    ];

    if (canHide) {
      items.push({
        value: 'hide',
        name: 'Hide Tab',
        fontIcon: 'eye-closed',
        withDelimiter: true,
      });
    }

    if (!isAssetCellVisible) {
      items.push({
        value: 'showAssets',
        name: 'Show Assets',
        fontIcon: 'eye',
        withDelimiter: !canHide,
      });
    }

    return items;
  }, [overviewCellSize, canHide, isAssetCellVisible, hiddenCheckClassName]);

  const handleMenuItemSelect = useLastCallback((value: CollectiblesMenuHandler) => {
    switch (value) {
      case 'small':
      case 'medium':
      case 'big':
        setOverviewCellSize({ size: value });
        break;
      case 'hide':
        setAreCollectiblesHidden({ isHidden: true });
        break;
      case 'showAssets':
        setAreAssetsHidden({ isHidden: false });
        break;
    }
  });

  return { menuItems, handleMenuItemSelect };
}
