import { DataClient } from './data-client/data-client';
import { DataRepository } from './repository/data-repository';
import { TossbankDataClient } from './data-client/impl/tossbank-data-client';
import { TossbankRepository } from './repository/impl/tossbank-repository';
import { TosspaymentsDataClient } from './data-client/impl/tosspayments-data-client';
import { TosspaymentsRepository } from './repository/impl/tosspayments-repository';

/**
 * 데이터를 처리하는 프로세스,
 *
 * 각 계열사에 맞는 dataClient, repository 가 필요합니다.
 */
export class DataProcessor {
  /**
   * (제 생각)
   * 인터페이스를 의존하는 클래스에서 어떤 구현체를 의존하는지는 이것만 보고는 알수없습니다.
   * 의존 관계를 코드로 설명 가능하게 끔 해야 DX를 잘 지키는 코드라고 생각합니다.
   */
  constructor(private readonly client: DataClient, private readonly repository: DataRepository) {}

  async process() {
    //복잡한 로직 ...
    const data = await this.client.request();
    await this.repository.save(data);
    //복잡한 로직 ...
  }
}

export type CompanyType = 'tosspayments' | 'tossbank';

export class DataProcessorFactory {
  static createFor(company: CompanyType) {
    switch (company) {
      case 'tossbank':
        return new DataProcessor(new TossbankDataClient(), new TossbankRepository());
      case 'tosspayments':
        return new DataProcessor(new TosspaymentsDataClient(), new TosspaymentsRepository());
      default:
        throw new Error(`not supported company: ${company}`);
    }
  }
}
