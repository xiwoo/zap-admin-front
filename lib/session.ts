import 'server-only'
import { cookies } from 'next/headers';
import { decodeJwt, JWTPayload } from 'jose';
 
 
export const decrypt = async (jwt: string | undefined = ''): Promise<JWTPayload | null> => {
  
  console.log(`decrypt > jwt: ${jwt}`);

  try {
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