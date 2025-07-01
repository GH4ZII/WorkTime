"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimeOffRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_timeoff_request_dto_1 = require("./create-timeoff-request.dto");
class UpdateTimeOffRequestDto extends (0, mapped_types_1.PartialType)(create_timeoff_request_dto_1.CreateTimeOffRequestDto) {
}
exports.UpdateTimeOffRequestDto = UpdateTimeOffRequestDto;
//# sourceMappingURL=update-timeoff-request.dto.js.map