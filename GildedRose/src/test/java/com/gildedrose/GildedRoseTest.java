package com.gildedrose;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GildedRoseTest {

    public static final String FOO = "foo";

    private Item createAndUpdate(String name, int sellIn, int quality) {
        Item[] items = new Item[] { new Item(name, sellIn, quality) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        return app.items[0];
    }

    @Test
    public void testFrameworkWorks() {
        Item item = createAndUpdate(FOO, 0,0);
        assertEquals(FOO, item.name);
    }

    @Test
    public void systemLowersValues() {
        Item item = createAndUpdate(FOO, 15,25);
        assertEquals(14, item.sellIn);
        assertEquals(24, item.quality);
    }

    @Test
    public void qualityDegradesTwiceAsFast() {
        Item item = createAndUpdate(FOO, 0,17);
        assertEquals(15, item.quality);
    }

    @Test
    public void qualityIsNeverNegative() {
        Item item = createAndUpdate(FOO, 0,0);
        assertEquals(0, item.quality);
    }

    @Test
    public void agedBrieIncreasesInQuality() {
        Item item = createAndUpdate(GildedRose.AGED_BRIE, 10,10);
        assertEquals(11, item.quality);
    }

    @Test
    public void qualityNeverMoreThanMaximum() {
        Item item = createAndUpdate(FOO, 15, 52);
        assertEquals(51, item.quality); // can exceed GildedRose.MAXIMUM_QUALITY if input exceeds GildedRose.MAXIMUM_QUALITY

        item = createAndUpdate(GildedRose.AGED_BRIE, 15, GildedRose.MAXIMUM_QUALITY);
        assertEquals(GildedRose.MAXIMUM_QUALITY, item.quality);
    }

    @Test
    public void sulfurasNeverHasToBeSoldOrDecreasesInQuality() {
        Item item = createAndUpdate(GildedRose.SULFURAS, 1, 42);
        assertEquals(1, item.sellIn); // sellIn doesn't change
        assertEquals(42, item.quality); // quality doesn't change
    }

    @Test
    public void backstagePassesIncreaseInQuality() {
        Item item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 15, 25);
        assertEquals(26, item.quality);
    }

    @Test
    public void backstagePassesIncreaseBy2() {
        Item item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 10, 25);
        assertEquals(27, item.quality);
    }

    @Test
    public void backstagePassesIncreaseBy3() {
        Item item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 5, 25);
        assertEquals(28, item.quality);
    }

    @Test
    public void backstagePassesQualityDropTo0() {
        Item item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 0, 25);
        assertEquals(0, item.quality);
    }

    @Test
    public void agedBrieNeverExpires() {
        Item item = createAndUpdate(GildedRose.AGED_BRIE, 0, 42);
        assertEquals(-1, item.sellIn);
        assertEquals(44, item.quality);
    }

    @Test
    public void backstagePassMaximumQuality() {
        Item item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 10, 48);
        assertEquals(GildedRose.MAXIMUM_QUALITY, item.quality);

        item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 10, 49);
        assertEquals(GildedRose.MAXIMUM_QUALITY, item.quality);

        item = createAndUpdate(GildedRose.BACKSTAGE_PASSES, 5, 49);
        assertEquals(GildedRose.MAXIMUM_QUALITY, item.quality);
    }

    @Test
    public void degradeInQualityUnlessSulfuras() {
        Item item = createAndUpdate(FOO, -1,1);
        assertEquals(0, item.quality);

        item = createAndUpdate(GildedRose.SULFURAS, -1,1);
        assertEquals(1, item.quality);
    }

    @Test
    public void agedBrieMaximumQuality() {
        Item item = createAndUpdate(GildedRose.AGED_BRIE, -1, 49);
        assertEquals(GildedRose.MAXIMUM_QUALITY, item.quality);
    }

    @Test
    public void conjuredDegradeTwiceAsFast() {
        Item item = createAndUpdate(GildedRose.CONJURED, 15,15);
        assertEquals(13, item.quality);
    }

}
