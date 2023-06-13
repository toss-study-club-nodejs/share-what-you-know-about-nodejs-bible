import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';

export class State {
  constructor(private readonly state: Map<string, ScrapingNotifierService>) {}

  nextState(userId: string, service: ScrapingNotifierService) {
    this.state.set(userId, service);
  }

  removeState(userId: string) {
    this.state.delete(userId);
  }
}
