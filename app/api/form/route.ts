import { NextRequest, NextResponse } from 'next/server';

interface FormSubmission {
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  birthDate?: string;
  residentState?: string;
  budget?: string;
  coverageType?: string;
  source?: string | null; 
  context?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmission = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get GoHighLevel credentials from environment variables
    const apiToken = process.env.GO_HIGH_LEVEL_API_TOKEN;
    const locationId = process.env.GO_HIGH_LEVEL_LOCATION_ID;

    if (!apiToken) {
      console.error('GoHighLevel API token is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!locationId) {
      console.error('GoHighLevel location ID is not configured');
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 500 }
      );
    }

    // Parse full name if provided
    let firstName = '';
    let lastName = '';
    
    if (body.fullName) {
      const nameParts = body.fullName.trim().split(/\s+/);
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else if (body.name) {
      const nameParts = body.name.trim().split(/\s+/);
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }


    const customFields: Array<{
      key: string;
      field_value: string | number | string[] | object;
      id?: string;
    }> = [];

    if (body.context) {
      customFields.push({
        key: 'context', // This must match your custom field name in GoHighLevel exactly
        field_value: body.context,
      });
    }

    if (body.budget) {
      customFields.push({
        key: 'monthly_budget', // This must match your custom field name in GoHighLevel exactly
        field_value: body.budget,
      });
    }
    if (body.coverageType) {
      customFields.push({
        key: 'coverage_type', // This must match your custom field name in GoHighLevel exactly
        field_value: body.coverageType,
      });
    }

    // Prepare tags array
    const tags: string[] = [];
    if (body.source) {
      tags.push(`Source: ${body.source}`);
    }
    if (body.coverageType) {
      tags.push(`Coverage: ${body.coverageType}`);
    }

    // Prepare contact data for GoHighLevel
    const contactData: any = {
      firstName: firstName || 'Unknown',
      lastName: lastName || 'Unknown',
      name: `${firstName} ${lastName}`.trim() || 'Unknown',
      email: body.email,
      phone: body.phone || '',
      dateOfBirth: body.birthDate || '',
      state: body.residentState || '',
      locationId: locationId,
      source: body.source || 'direct',
    };

    // Add tags if any
    if (tags.length > 0) {
      contactData.tags = tags;
    }

    // Add custom fields if any
    if (customFields.length > 0) {
      contactData.customFields = customFields;
    }
    console.log(contactData);

    // Create contact using GoHighLevel API
    const apiUrl = 'https://services.leadconnectorhq.com/contacts/';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      console.error('GoHighLevel API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      return NextResponse.json(
        { 
          error: 'Failed to create contact in GoHighLevel',
          details: errorData.message || response.statusText,
          status: response.status
        },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      contactId: result.id || result.contact?.id || result.contactId,
      message: 'Contact created successfully in GoHighLevel',
      data: result,
    });

  } catch (error: any) {
    console.error('Error processing form submission:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
