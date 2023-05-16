
import { StubWebClient } from '../StubWebClient';
import { WebClient } from "../../../src/web-client/WebClient";
import { WebClientService } from "../../../src/web-client/creator/WebClientService";

export class TestWebClientService extends WebClientService {
  create(url?: string): WebClient {
    return StubWebClient.getInstance(url);
  }
}
