"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorklogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_worklog_dto_1 = require("./create-worklog.dto");
class UpdateWorklogDto extends (0, mapped_types_1.PartialType)(create_worklog_dto_1.CreateWorklogDto) {
}
exports.UpdateWorklogDto = UpdateWorklogDto;
//# sourceMappingURL=update-worklog.dto.js.map