import { Vendor } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { PostScraper } from '@app/scraping-post/post-scraper';
import { PostTransformer } from '@app/scraping-post/post-transformer';

export const scrapingPostStrategyMap = new Map<Vendor, PostScraper>();
export const transformerPostStrategyMap = new Map<Vendor, PostTransformer>();

@Injectable()
export class ScrapingPostStrategy {
  get(vendor: Vendor): PostScraper {
    return scrapingPostStrategyMap.get(vendor);
  }

  getTransformer(vendor: Vendor) {
    return transformerPostStrategyMap.get(vendor);
  }
}
