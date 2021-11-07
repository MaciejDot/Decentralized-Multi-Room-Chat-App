import {  render } from "@testing-library/react"
import { Login } from "../../../components/Login/Login"
import { BasicTestWrapper } from "../../utilis/BasicTestWrapper"


test("login view smoke test",()=>{
    const {getByText} =  render(<BasicTestWrapper><Login/></BasicTestWrapper>);
    expect(getByText("Sign In")).toBeDefined()
    expect(getByText("Create An Account")).toBeDefined()
})