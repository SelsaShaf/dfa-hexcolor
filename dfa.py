class HexColorDFA:
    """
    DFA untuk validasi format kode warna hexadecimal (#RRGGBB).

    Q  = {q0, q1, q2, q3, q4, q5, q6, q7, qtrap}
    q0 = state awal
    F  = {q7} (state akhir / diterima)
    """

    START = "q0"
    ACCEPT = "q7"
    TRAP = "qtrap"
    HEX_CHARS = set("0123456789abcdefABCDEF")
    URUTAN_STATE_HEX = ["q1", "q2", "q3", "q4", "q5", "q6"]

    def _transisi(self, state, char):
        if state == self.TRAP:
            return self.TRAP

        if state == self.START:
            return "q1" if char == "#" else self.TRAP

        if state in self.URUTAN_STATE_HEX:
            idx = self.URUTAN_STATE_HEX.index(state)
            state_berikut = "q" + str(idx + 2)  # q1->q2, ..., q6->q7
            return state_berikut if char in self.HEX_CHARS else self.TRAP

        if state == self.ACCEPT:
            return self.TRAP

        return self.TRAP

    def validate(self, input_string):
        state = self.START
        jejak = [state]

        for ch in input_string:
            state = self._transisi(state, ch)
            jejak.append(state)

        return {
            "input": input_string,
            "valid": state == self.ACCEPT,
            "final_state": state,
            "trace": jejak,
        }