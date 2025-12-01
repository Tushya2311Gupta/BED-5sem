const app=require("./index");
const request=require("supertest");

describe("POST /sum",()=>{
    test("should return sum of two numbers",async()=>{
        const response=await request(app)
        .post("/sum")
        .send({a:2,b:3});
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            success:true,
            data:5
        });
    });

    test("should handle non-number inputs",async()=>{
        const response=await request(app)
        .post("/sum")
        .send({a:"2",b:3});
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            success:true,
            data:"23"
        });
    });
});