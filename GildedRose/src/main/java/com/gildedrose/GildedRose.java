package com.gildedrose;

class GildedRose {
    public static final String AGED_BRIE = "Aged Brie";
    public static final String BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
    public static final String SULFURAS = "Sulfuras, Hand of Ragnaros";
    public static final String CONJURED = "Conjured";
    public static final int MAXIMUM_QUALITY = 50;
    public static final int BACKSTAGE_PASS_THRESHOLD1 = 11;
    public static final int BACKSTAGE_PASS_THRESHOLD2 = 6;


    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (int i = 0; i < items.length; i++) {
            Item item = items[i];
            handleIfNormalItem(item);
            handleIfAgedBrie(item);
            handleIfBackstagePasses(item);
            handleIfConjured(item);
        }
    }

    private void handleIfConjured(Item item) {
        if(isConjured(item)){
            item.quality -= 2;
            item.sellIn--;
        }
    }

    private void handleIfBackstagePasses(Item item) {
        if(isBackstagePasses(item)) {
            item.sellIn--;
            if (item.sellIn <= 0) {
                item.quality = 0;
            } else if (item.sellIn < BACKSTAGE_PASS_THRESHOLD2) {
                item.quality = item.quality + 3;
            } else if (item.sellIn < BACKSTAGE_PASS_THRESHOLD1) {
                item.quality = item.quality + 2;
            } else {
                item.quality++;
            }
            if (item.quality > MAXIMUM_QUALITY) {
                item.quality = MAXIMUM_QUALITY;
            }
        }
    }

    private void handleIfAgedBrie(Item item) {
        if(isAgedBrie(item)) {
            item.sellIn--;
            if (item.sellIn <= 0) {
                item.quality = item.quality + 2;
            } else {
                item.quality++;
            }
            if (item.quality > MAXIMUM_QUALITY) {
                item.quality = MAXIMUM_QUALITY;
            }
        }
    }

    private void handleIfNormalItem(Item item) {
        if(isNormalItem(item)) {
            item.sellIn--;
            if (item.sellIn <= 0) {
                item.quality = item.quality - 2;
            } else {
                item.quality--;
            }
            if (item.quality < 0) {
                item.quality = 0;
            }
        }
    }

    private boolean isNormalItem(Item item) {
        return !(isBackstagePasses(item) || isSulfuras(item) || isAgedBrie(item) || isConjured(item));
    }

    private boolean isBackstagePasses(Item item) {
        return item.name.equals(BACKSTAGE_PASSES);
    }

    private boolean isSulfuras(Item item) {
        return item.name.equals(SULFURAS);
    }

    private boolean isAgedBrie(Item item) {
        return item.name.equals(AGED_BRIE);
    }

    private boolean isConjured(Item item) {
        return item.name.equals(CONJURED);
    }
}