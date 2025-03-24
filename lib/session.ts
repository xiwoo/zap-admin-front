import 'server-only'
import { cookies } from 'next/headers'
import { jwtVerify, decodeJwt } from 'jose'
// import { SessionPayload } from '@/app/lib/definitions'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey)
// }
 
export const decrypt = async (jwt: string | undefined = ''): JWTPayload | null => {
  
  console.log(`decrypt > jwt: ${jwt}`);

  try {
    // const { payload } = await jwtVerify(jwt, encodedKey, {
    //   algorithms: ['HS256'],
    // })
    return decodeJwt(jwt);
  } catch (error) {
    console.log('decrypt > Failed to verify session')
    return null
  }
}
 
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('JWT')
}