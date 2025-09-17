import { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';

export class ErrorListener implements ANTLRErrorListener<any> {
  syntaxError<T>(
    recognizer: Recognizer<T, any>,
    offendingSymbol: T,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ): void {
    throw new Error(`Error at line ${line}:${charPositionInLine} - ${msg}`);
  }
}
