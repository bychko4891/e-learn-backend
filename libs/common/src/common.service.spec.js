"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_service_1 = require("./common.service");
describe('CommonService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [common_service_1.CommonService],
        }).compile();
        service = module.get(common_service_1.CommonService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=common.service.spec.js.map