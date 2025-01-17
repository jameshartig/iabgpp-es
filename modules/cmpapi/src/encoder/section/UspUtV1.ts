import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { AbstractEncodableBitStringSection } from "./AbstractEncodableBitStringSection.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedIntegerList } from "../datatype/EncodableFixedIntegerList.js";
import { DecodingError } from "../error/DecodingError.js";
import { UspUtV1Field } from "../field/UspUtV1Field.js";
import { AbstractBase64UrlEncoder } from "../datatype/encoder/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../datatype/encoder/CompressedBase64UrlEncoder.js";

export class UspUtV1 extends AbstractEncodableBitStringSection {
  public static readonly ID = 11;
  public static readonly VERSION = 1;
  public static readonly NAME = "usputv1";

  private base64UrlEncoder: AbstractBase64UrlEncoder = new CompressedBase64UrlEncoder();

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    // core section
    fields.set(UspUtV1Field.VERSION.toString(), new EncodableFixedInteger(6, UspUtV1.VERSION));
    fields.set(UspUtV1Field.SHARING_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.SALE_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.SALE_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(
      UspUtV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      new EncodableFixedIntegerList(2, [0, 0, 0, 0, 0, 0, 0, 0])
    );
    fields.set(UspUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.MSPA_COVERED_TRANSACTION.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspUtV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(), new EncodableFixedInteger(2, 0));

    let fieldOrder = [
      UspUtV1Field.VERSION.toString(),
      UspUtV1Field.SHARING_NOTICE.toString(),
      UspUtV1Field.SALE_OPT_OUT_NOTICE.toString(),
      UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(),
      UspUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE.toString(),
      UspUtV1Field.SALE_OPT_OUT.toString(),
      UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(),
      UspUtV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      UspUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(),
      UspUtV1Field.MSPA_COVERED_TRANSACTION.toString(),
      UspUtV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(),
      UspUtV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(),
    ];

    super(fields, fieldOrder);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    return this.base64UrlEncoder.encode(this.encodeToBitString());
  }

  //Overriden
  public decode(bitString: string): void {
    this.decodeFromBitString(this.base64UrlEncoder.decode(bitString));
  }

  //Overriden
  public getId(): number {
    return UspUtV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspUtV1.NAME;
  }
}
